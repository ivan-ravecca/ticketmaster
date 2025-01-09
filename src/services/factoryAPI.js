import * as customEventsAPI from "./eventsAPI";
import * as storeAPI from "./storeAPI";
class FactoryAPI {
  constructor(useSQL) {
    if (useSQL) {
      return customEventsAPI;
    }
    return storeAPI;
  }
}

export default FactoryAPI;
