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
  if (max && min) {
    if (limitParams?.excludeMin) {
      min.setMilliseconds(min.getMilliseconds() + 1);
    }
    if (limitParams?.excludeMax) {
      max.setMilliseconds(max.getMilliseconds() - 1);
    }
    return Between(min, max);
  } else if (min) {
    return MoreThan(min);
  } else if (max) {
    return LessThan(max);
  } else {
    return undefined;
  }
};

const dbUtils = {
  getWhereOperatorFromFilterDateInput
};

export default dbUtils;
