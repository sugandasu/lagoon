import RabbitMQ from "./rabbitmq";
import Rest from "./rest";

export interface BaseAction {
  type: string;
}

type Action = Rest | RabbitMQ;

export default Action;
