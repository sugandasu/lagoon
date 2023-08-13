import RabbitMQActionConfig from "../../model/rabbitmq";
import RestConfig from "../../model/rest";
import { BaseActionConfig, Result } from "./../../model/action";
import RabbitMQAction from "./rabbitmq";
import { RestAction } from "./rest";

export interface Action {
  config: BaseActionConfig;
  start(): Promise<Result>;
  validate(): Result;
}

export default function NewAction(config: BaseActionConfig): Action {
  switch (config.type) {
    case "rest":
      return new RestAction(config as RestConfig);
    case "rabbitmq":
      return new RabbitMQAction(config as RabbitMQActionConfig);
    default:
      throw new Error("action not found");
  }
}
