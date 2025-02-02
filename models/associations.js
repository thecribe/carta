import { Cohort } from "./cohort";
import { Fellow } from "./fellow";
import { Institution } from "./institution";

Fellow.belongsTo(Institution);
Institution.hasMany(Fellow);

Fellow.belongsTo(Cohort);
Cohort.hasMany(Fellow);

export { Fellow, Institution, Cohort };
