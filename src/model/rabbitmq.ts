import { objects } from "../constant";
import { BaseActionConfig } from "./action";

export interface RabbitMQConfig {
  username: string;
  password: string;
  host: string;
  port: number;
}

export interface RabbitMQPayload {
  headers?: objects;
  body?: objects;
}

export interface RabbitMQResponse {
  headers?: objects;
  body?: objects;
}

export function rabbitMQToURI(config: RabbitMQConfig): string {
  return `amqp://${config.username ?? "guest"}:${config.password ?? "guest"}@${
    config.host ?? "localhost"
  }:${config.port ?? 5672}/`;
}

export default interface RabbitMQActionConfig extends BaseActionConfig {
  config: RabbitMQConfig;
  method: string;
  path: string;
  payload?: RabbitMQPayload | string;
  response: RabbitMQResponse | string;
}
