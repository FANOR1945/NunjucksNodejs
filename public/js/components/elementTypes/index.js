import Card from './card.js';
import Button from './button.js';
import Input from './input.js';
import Logo from './logo.js';
import Icon from './icon.js';
import Text from './text.js';
import Json from './json.js';
import Markdown from './markdown.js';
import Table from './table.js';
import Html from './html.js';
import Terminal from './terminal.js';
import Container from './container.js';
import Nunjucks from './nunjucks.js';
import DataGrid from './dataGrid.js'
export const ELEMENT_TYPES = {
NUNJUCKS:Nunjucks,
DATAGRID:DataGrid,
  CARD:Card,
  BUTTON:Button,
  INPUT:Input,
  LOGO:Logo,
  ICON:Icon,
  TEXT:Text,
  JSON:Json,
  MARKDOWN:Markdown,
  CONTAINER:Container,
  TABLE:Table,
  HTML:Html,
  TERMINAL:Terminal
};

export const getElementType = (type) => {
    return ELEMENT_TYPES[type?.toUpperCase()] || ELEMENT_TYPES.TEXT;
  };
