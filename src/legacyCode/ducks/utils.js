import { OrderedMap, Map } from 'immutable'

export function fbDatatoEntities(data, RecordModel = Map) {
  return new OrderedMap(data).mapEntries(([uid, value]) => [
    uid,
    new RecordModel(value).set('uid', uid),
  ])
}
