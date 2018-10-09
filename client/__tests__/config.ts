import { get, set } from '../src/ops/config';

describe('测试config的功能', () => {
  it('在没有初始化之前能够自动创建文件', async () => {
    const conf = await get();
    expect(conf).not.toBeNull();
  })
  it('可以在配置文件中设置数据，返回整个配置', async () => {
    let conf = await set('nickname', 'guoshencheng');
    expect(conf).not.toBeNull();
    conf = await get();
    expect(conf).not.toBeNull();
    expect(conf.nickname).not.toBeNull();
  })
  it('返回某个key的配置', async () => {
    const nickname = await get('nickname');
    expect(nickname).not.toBeNull();
  })
})