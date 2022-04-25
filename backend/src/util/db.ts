import { Between, MoreThan, LessThan } from 'typeorm';
import { FilterDateInput } from '../inputs/event/FilterEventsInput';

interface ExcludeLimitsParams {
  excludeMin?: boolean;
  excludeMax?: boolean;
}

const getWhereOperatorFromFilterDateInput = (
  filterDateInput: FilterDateInput | undefined,
  limitParams?: ExcludeLimitsParams
) => {
  if (!filterDateInput) {
    return undefined;
  }
  const { min, max } = filterDateInput;
  const usedMin = min || new Date('1800-01-01');
  const usedMax = max || new Date('2500-01-01');
  if (limitParams?.excludeMin) {
    usedMin.setMilliseconds(usedMin.getMilliseconds() + 1);
  }
  if (limitParams?.excludeMax) {
    usedMax.setMilliseconds(usedMax.getMilliseconds() - 1);
  }
  return Between(usedMin, usedMax);
};

const dbUtils = {
  getWhereOperatorFromFilterDateInput
};

export default dbUtils;
