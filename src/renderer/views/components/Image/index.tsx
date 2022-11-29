import {AppBar, Button, Container, Box, BoxTypeMap, BoxProps, Typography, TypographyTypeMap } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {CloseOutlined, Remove, ZoomOutMap } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent';

const Image: OverridableComponent<TypographyTypeMap<{}, "div">> = (prop: BoxProps) =>(
  <Typography>
    yyy
  </Typography>
)

export default Image