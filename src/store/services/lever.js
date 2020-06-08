import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class Lever extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "Lever";

  static instanceDefaults() {
    return {
      name: ""
    };
  }
}

const servicePath = "lever";
const servicePlugin = makeServicePlugin({
  Model: Lever,
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
