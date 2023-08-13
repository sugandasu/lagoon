import amqp from "amqplib/callback_api";
import { Action } from ".";
import { Result } from "../../model/action";
import RabbitMQActionConfig, { rabbitMQToURI } from "../../model/rabbitmq";
import { findInList } from "../../util";

export default class RabbitMQAction implements Action {
  config: RabbitMQActionConfig;

  constructor(cfg: RabbitMQActionConfig) {
    this.config = cfg;
  }

  async start(): Promise<Result> {
    let result: Result = {};

    let err = this.validate();
    if (!err) {
      result.error = err;
      return result;
    }

    try {
      amqp.connect(
        rabbitMQToURI(this.config.config),
        function (error0: any, connection: any) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function (error1: any, channel: any) {
            if (error1) {
              throw error1;
            }
            var queue = "hello";
            var msg = "Hello world";

            channel.assertQueue(queue, {
              durable: false,
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
          });
        }
      );
    } catch (error) {}

    return result;
  }

  validate(): Result {
    let result: Result = {};
    if (!this.config.type) {
      result.error = `❌ type is empty`;
      return result;
    }
    if (this.config.type != "rabbitmq") {
      result.error = `❌ type is not rabbitmq`;
      return result;
    }
    if (!this.config.path) {
      result.error = `❌ path is empty`;
      return result;
    }
    if (!this.config.config) {
      result.error = `❌ config is empty`;
      return result;
    }
    if (!this.config.method) {
      result.error = `❌ method is empty`;
      return result;
    }
    if (
      !findInList(["publish", "subscribe"], this.config.method.toLowerCase())
    ) {
      result.error = `❌ method ${this.config.method} is not found`;
      return result;
    }
    if (this.config.method == "publish") {
    }

    return result;
  }
}
