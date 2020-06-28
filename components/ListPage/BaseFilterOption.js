import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    // Add background color on selected
    backgroundColor: ({ selected }) =>
      selected ? theme.palette.secondary[50] : undefined,

    // Hide border color when not chip and not selected
    borderColor: ({ chip, selected }) =>
      !chip && !selected ? `transparent` : undefined,
  },
}));

/**
 * @param {boolean} props.chip - toggle chip-like border on display
 * @param {boolean} props.selected
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onClick
 */
function BaseFilterOption({
  chip,
  selected,
  label,
  value,
  onClick = () => {},
}) {
  const classes = useStyles({ chip, selected });
  const handleClick = () => {
    onClick(value);
  };

  return (
    <Chip
      variant="outlined"
      classes={classes}
      label={label}
      onClick={handleClick}
    />
  );
}

export default BaseFilterOption;
