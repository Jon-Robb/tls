import { Client, Room } from "colyseus";
import { MatchRoomState } from "./schema/MatchRoomState";
import { Message } from "../../types/messages";
import { Dispatcher } from "@colyseus/command";
import PlayerSelectionCommand from "../commands/PlayerSelectionCommands";

// export default didnt work here but classic export did
export class MatchRoom extends Room<MatchRoomState> {

    private dispatcher = new Dispatcher(this)

    onCreate() {
        // set initial room state
        this.setState(new MatchRoomState())

        this.onMessage(Message.PlayerSelection, (client, message) => {
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client: client,
                index: message.index
            });
        })
    }

}