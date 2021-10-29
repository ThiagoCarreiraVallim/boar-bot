export interface AddServerModel {
  server_id: string
  name: string
}

export interface AddServer {
  add: (server: AddServerModel) => Promise<void>
}
