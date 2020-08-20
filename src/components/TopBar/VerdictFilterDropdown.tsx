import { Menu, MenuItem, Popover } from '@blueprintjs/core';
import { find } from 'lodash';
import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

import { usePopover } from '~/ui/hooks/usePopover';
import { Verdict } from '~/domain/hubble';

import VerdictIcon from '~/assets/icons/verdict-icon.svg';
import { FilterIcon } from './FilterIcon';

import css from './styles.scss';

export interface Props {
  verdict: Verdict | null;
  onSelect?: (verdict: Verdict | null) => void;
}

interface FilterOption {
  verdict: Verdict | null;
  title: string;
}

const filters: FilterOption[] = [
  {
    verdict: null,
    title: 'Any verdict',
  },
  {
    verdict: Verdict.Forwarded,
    title: 'Forwarded',
  },
  {
    verdict: Verdict.Dropped,
    title: 'Dropped',
  },
];

export const VerdictFilterDropdown = memo<Props>(function VerdictFilterDropdown(
  props,
) {
  const popover = usePopover();

  const getLabel = useCallback(() => {
    const found = find(filters, f => f.verdict === props.verdict);
    return found ? found.title : '';
  }, [props.verdict]);

  const content = (
    <Menu>
      {filters.map(filter => (
        <MenuItem
          key={String(filter.verdict)}
          active={props.verdict == filter.verdict}
          text={filter.title}
          onClick={() => props.onSelect?.(filter.verdict)}
        />
      ))}
    </Menu>
  );

  return (
    <Popover {...popover.props} content={content}>
      <FilterIcon
        icon={<VerdictIcon />}
        text={getLabel()}
        onClick={popover.toggle}
        className={classnames({
          [css.verdictFilterDropped]: props.verdict === Verdict.Dropped,
          [css.verdictFilterForwarded]: props.verdict === Verdict.Forwarded,
        })}
      />
    </Popover>
  );
});
