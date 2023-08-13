import RabbitMQActionConfig from "./rabbitmq";
import RestActionConfig from "./rest";

export interface BaseActionConfig {
  type: "rest" | "rabbitmq";
}

export interface Result {
  data?: string[];
  error?: string;
}

type ActionConfig = RestActionConfig | RabbitMQActionConfig;

export default ActionConfig;
