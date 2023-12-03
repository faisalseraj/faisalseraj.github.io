import { Icon, IconProps } from '@chakra-ui/icon';
import { SystemStyleObject } from '@chakra-ui/system';

type TableRowExpandIconProps = {
  isOpen?: boolean;
} & IconProps;

export const TableRowExpandIcon = ({
  isOpen = false,
  ...rest
}: TableRowExpandIconProps) => {
  const iconStyles: SystemStyleObject = {
    transform: isOpen ? 'rotate(-180deg)' : undefined,
    transformOrigin: 'center',
    transition: 'transform 0.2s'
  };

  return (
    <Icon viewBox="0 0 20 13" aria-hidden __css={iconStyles} {...rest}>
      <path
        d="M10 7.77813L17.7781 0L20 2.22187L10 12.2219L0 2.22187L2.22187 0L10 7.77813Z"
        fill="currentColor"
      />
    </Icon>
  );
};
