import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class KpiCampaignsObjectives extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = "KpiCampaignsObjectives";

  static instanceDefaults() {
    return {
      weight: 0,
      objectivesValue: 0
    };
  }
}

const servicePath = "kpi-campaigns-objectives";
const servicePlugin = makeServicePlugin({
  Model: KpiCampaignsObjectives,
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
