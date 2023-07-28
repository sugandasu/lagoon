import RabbitMQ from "./rabbitmq";
import Rest from "./rest";

export interface BaseAction {
  type: string;
}

export interface Result {
  data?: string[];
  error?: string;
}

type Action = Rest | RabbitMQ;

export default Action;
