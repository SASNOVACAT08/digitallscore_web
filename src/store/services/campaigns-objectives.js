import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class CampaignsObjectives extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "CampaignsObjectives";

  static instanceDefaults() {
    return {
      weight: 0,
      budgetPart: 0
    };
  }
}

const servicePath = "campaigns-objectives";
const servicePlugin = makeServicePlugin({
  Model: CampaignsObjectives,
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
