import en from './messages/en.json';
import bg from './messages/bg.json';
 
type Messages = typeof en & typeof bg;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}