enum Routes {
  // Home = 'home',
  // Login = 'login',
  // Profile = 'profile',
  Settings = 'settings',
  // Post = 'post',
  Landing = 'landing',
  Playground = 'playground'
}
  
export type NavigationParams = PlaygroundStackParams;
  
export type PlaygroundStackParams = {
  [Routes.Playground]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Landing]: undefined;
};
  
export default Routes;
