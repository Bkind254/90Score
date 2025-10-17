import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import PropTypes from 'prop-types';
import '../../Styles/Button.css'; // Import the CSS file

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Applying the variant and size classes directly in the JSX.
    return (
      <Comp className={`button ${variant} ${size} ${className}`} ref={ref} {...props} />
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

export { Button };
