export class TopicGlobal {
  id?: number;
  topic_name?: string;

  constructor({ id, topic_name }) {
    if (id !== undefined) this.id = id;
    if (topic_name !== undefined) this.topic_name = topic_name;
  }
}
