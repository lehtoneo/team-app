import { Between, MoreThan, LessThan } from 'typeorm';
import { FilterDateInput } from '../inputs/event/FilterEventsInput';

const getWhereOperatorFromFilterDateInput = (
  filterDateInput: FilterDateInput
) => {
  if (filterDateInput.max && filterDateInput.min) {
    return Between(filterDateInput.min, filterDateInput.max);
  } else if (filterDateInput.min) {
    return MoreThan(filterDateInput.min);
  } else if (filterDateInput.max) {
    return LessThan(filterDateInput.max);
  } else {
    return undefined;
  }
};

const dbUtils = {
  getWhereOperatorFromFilterDateInput
};

export default dbUtils;
