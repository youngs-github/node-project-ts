import DevOption from './dev.cfg';
import PodOption from './pod.cfg';
import TesOption from './tes.cfg';

/**
 * 整体配置项
 */
let option: IConfigOption;

if (process.env.NODE_ENV === 'developement') {
  option = PodOption;
} else if (process.env.NODE_ENV === 'test') {
  option = TesOption;
  // 去除打印信息
  console.warn = console.info = console.log = console.debug = () => 0;
} else {
  // 默认dev环境
  option = DevOption;
}

export default option;
