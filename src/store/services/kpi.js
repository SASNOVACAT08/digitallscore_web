import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class Kpi extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "Kpi";

  static instanceDefaults() {
    return {
      name: "",
      custom: true
    };
  }
}

const servicePath = "kpi";
const servicePlugin = makeServicePlugin({
  Model: Kpi,
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
