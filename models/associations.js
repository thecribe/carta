import { Cohort } from "./cohort";
import { Fellow } from "./fellow";

Fellow.belongsTo(Cohort);
Cohort.hasMany(Fellow);

export { Fellow, Cohort };
