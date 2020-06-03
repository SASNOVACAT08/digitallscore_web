import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class Discipline extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "Discipline";

  static instanceDefaults() {
    return {
      name: ""
    };
  }
}

const servicePath = "discipline";
const servicePlugin = makeServicePlugin({
  Model: Discipline,
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
