export const getColorClass = (
  color: 'primary' | 'accent' | 'error',
  solid: boolean,
  disabled: boolean,
  link: boolean
) => {
  if (link) {
    return 'text-skin-primary underline underline-offset-4 hover:underline-offset-2 hover:text-skin-accent';
  }

  let colorClasses = 'border';

  switch (color) {
    case 'primary':
      colorClasses =
        colorClasses +
        ' ' +
        (solid === true
          ? 'text-skin-inverted border-skin-primary bg-skin-primary'
          : 'text-skin-primary border-skin-primary');
      break;

    case 'accent':
      colorClasses =
        colorClasses +
        ' ' +
        (solid === true
          ? 'text-skin-inverted border-skin-accent bg-skin-accent'
          : 'text-skin-accent border-skin-accent');
      break;

    case 'error':
      colorClasses =
        colorClasses +
        ' ' +
        (solid === true
          ? 'text-skin-inverted border-skin-error bg-skin-error'
          : 'text-skin-error border-skin-error');
      break;

    default:
      colorClasses =
        colorClasses +
        ' ' +
        (solid === true
          ? 'text-skin-inverted border-skin-primary bg-skin-primary'
          : 'text-skin-primary border-skin-primary');
      break;
  }

  if (disabled) {
    colorClasses = colorClasses + ' ' + 'pointer-events-none opacity-60';
  }

  return colorClasses;
};

export const getSizeClass = (
  size: 'sm' | 'md' | 'lg',
  onlyIcon: boolean,
  link = false
) => {
  if (onlyIcon) {
    return 'px-1 py-1';
  }

  if (link) {
    return 'px-2 py-1.5' + ' ' + 'text-base ';
  }

  let sizeClasses =
    'min-w-[60px] px-2 py-1 md:min-w-[100px] md:px-4 md:py-2' +
    ' ' +
    ' text-xs';

  switch (size) {
    case 'sm':
      sizeClasses =
        'min-w-[40px] px-1 py-0.5 md:min-w-[60px] md:px-2 md:py-1' +
        ' ' +
        ' text-xs';
      return sizeClasses;

    case 'lg':
      sizeClasses =
        'min-w-[100px] px-4 py-2 md:min-w-[120px] md:px-6 md:py-3' +
        ' ' +
        ' text-sm';
      return sizeClasses;

    default:
      return sizeClasses;
  }
};

export const getIconBtnSizeClass = (size: 'sm' | 'md' | 'lg') => {
  let sizeClasses = 'p-1.5';

  switch (size) {
    case 'sm':
      sizeClasses = 'p-1';
      return sizeClasses;

    case 'lg':
      sizeClasses = 'p-2';
      return sizeClasses;

    default:
      return sizeClasses;
  }
};
