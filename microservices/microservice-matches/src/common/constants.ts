export enum RabbitMQ {
  MatchQueue = 'matches',
}

export enum MatchMsg {
  CREATE = 'CREATE_MATCH',
  FIND_ALL = 'FIND_MATCHES',
  FIND_ONE = 'FIND_MATCH',
  UPDATE = 'UPDATE_MATCH',
  DELETE = 'DELETE_MATCH',
}
