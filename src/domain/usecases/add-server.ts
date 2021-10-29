export interface AddServerModel {
  serverId: string
  name: string
  active: boolean
}

export interface AddServer {
  add: (server: AddServerModel) => Promise<void>
}
