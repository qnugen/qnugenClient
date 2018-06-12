import { Request, Response, Router } from "express";
import FashionChannelModel from "../interfaces/FashionChannelModel";
import ChannelsService from "../classes/ChannelsService";
import { RouteHandler, Get, Post, Put, Delete } from "../decorators/RouteHandler";
import Server from "../classes/Server";

@RouteHandler("/channels")
class ChannelsRoute {
    public router: Router;
    private channelsService: ChannelsService;

    constructor(public app: Server) {
        this.channelsService = new ChannelsService();
    }

    @Get()
    public getChannels(request: Request, response: Response): void {
        // I'm not a huge fan of JavaScript callbacks hell and expecially of using it in NodeJS, so I'll use promises instead.
        this.channelsService.getChannels()
            .then((channels: FashionChannelModel[]) => {
                return response.json(channels);
            })
            .catch((errror: Error) => {
                console.error(errror);
            });
    }

    @Get("/:id")
    public getChannelById(request: Request, response: Response): void {
        const id = request.params.id;
        this.channelsService.getChannelById(id)
            .then((channel: FashionChannelModel) => {
                return response.json(channel);
            })
            .catch((error: Error) => {
                console.error(error);
                return response.status(400).json({ error: error });
            });
    }

    @Post()
    public createChannel(request: Request, response: Response): void {
        this.channelsService.createChannel(request.body)
            .then((createdChannel: FashionChannelModel) => {
                return response.json(createdChannel);
            })
            .catch((error: Error) => {
                console.error(error);
                return response.status(400).json({ error: error });
            });
    }

    @Put(":/id")
    public updateChannel(request: Request, response: Response): void {
        const id = request.params.id;
        const requestBody = request.body;

        this.channelsService.updateChannel(id, requestBody)
            .then((updatedChannel: FashionChannelModel) => {
                return response.status(204).end();
            })
            .catch((error: Error) => {
                console.error(error);
                return response.json({ err: error });
            });
    }

    @Delete("/:id")
    public deleteChannel(request: Request, response: Response): void {
        const channelId = request.params.id;
        this.channelsService.deleteChannel(channelId)
            .then(() => {
                return response.status(204).end();
            })
            .catch((error: Error) => {
                console.error(error);
                return response.json({ error: error });
            });
    }
}

export default ChannelsRoute;
