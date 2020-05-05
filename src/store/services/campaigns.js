import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class Campaigns extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "Campaigns";

  static instanceDefaults() {
    return {
      advertiser: "",
      name: "",
      product: "",
      budget: 0,
      ended: false,
      startedAt: "",
      endedAt: "",
      score: 0
    };
  }
}

const servicePath = "campaigns";
const servicePlugin = makeServicePlugin({
  Model: Campaigns,
  service: feathersClient.service(servicePath),
  servicePath
});

feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;
