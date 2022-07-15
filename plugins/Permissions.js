export default ({store}, inject) => {
	// Inject $hello(msg) in Vue, context and store.
	let auth = store.state.auth;
	if(store && auth){
		let u = auth.user;
		inject('can', arg => u && (u.permissions.some(e => e.name == arg || arg == "/") || u.is_master));

		// inject('COMPANY_CREATE', () => u && (u.permissions.some(e => e.name == 'company_create' || arg == "/") || u.is_master));
		// inject('COMPANY_EDIT', () => u && (u.permissions.some(e => e.name == 'company_edit' || arg == "/") || u.is_master));
		// inject('COMPANY_DELETE', () => u && (u.permissions.some(e => e.name == 'company_delete' || arg == "/") || u.is_master));
		// inject('COMPANY_VIEW', () => u && (u.permissions.some(e => e.name == 'company_view' || arg == "/") || u.is_master));
		// inject('COMPANY_ACCESS', () => u && (u.permissions.some(e => e.name == 'company_access' || arg == "/") || u.is_master));

		// inject('BRANCH_CREATE', () => u && (u.permissions.some(e => e.name == 'branch_create' || arg == "/") || u.is_master));
		// inject('BRANCH_EDIT', () => u && (u.permissions.some(e => e.name == 'branch_edit' || arg == "/") || u.is_master));
		// inject('BRANCH_DELETE', () => u && (u.permissions.some(e => e.name == 'branch_delete' || arg == "/") || u.is_master));
		// inject('BRANCH_VIEW', () => u && (u.permissions.some(e => e.name == 'branch_view' || arg == "/") || u.is_master));
		// inject('BRANCH_ACCESS', () => u && (u.permissions.some(e => e.name == 'branch_access' || arg == "/") || u.is_master));

		// inject('DEVICE_CREATE', () => u && (u.permissions.some(e => e.name == 'device_create' || arg == "/") || u.is_master));
		// inject('DEVICE_EDIT', () => u && (u.permissions.some(e => e.name == 'device_edit' || arg == "/") || u.is_master));
		// inject('DEVICE_DELETE', () => u && (u.permissions.some(e => e.name == 'device_delete' || arg == "/") || u.is_master));
		// inject('DEVICE_VIEW', () => u && (u.permissions.some(e => e.name == 'device_view' || arg == "/") || u.is_master));
		// inject('DEVICE_ACCESS', () => u && (u.permissions.some(e => e.name == 'device_access' || arg == "/") || u.is_master));

		// inject('MODULE_CREATE', () => u && (u.permissions.some(e => e.name == 'module_create' || arg == "/") || u.is_master));
		// inject('MODULE_EDIT', () => u && (u.permissions.some(e => e.name == 'module_edit' || arg == "/") || u.is_master));
		// inject('MODULE_DELETE', () => u && (u.permissions.some(e => e.name == 'module_delete' || arg == "/") || u.is_master));
		// inject('MODULE_VIEW', () => u && (u.permissions.some(e => e.name == 'module_view' || arg == "/") || u.is_master));
		// inject('MODULE_ACCESS', () => u && (u.permissions.some(e => e.name == 'module_access' || arg == "/") || u.is_master));

		// inject('ASSIGN_MODULE_CREATE', () => u && (u.permissions.some(e => e.name == 'assign_module_create' || arg == "/") || u.is_master));
		// inject('ASSIGN_MODULE_EDIT', () => u && (u.permissions.some(e => e.name == 'assign_module_edit' || arg == "/") || u.is_master));
		// inject('ASSIGN_MODULE_DELETE', () => u && (u.permissions.some(e => e.name == 'assign_module_delete' || arg == "/") || u.is_master));
		// inject('ASSIGN_MODULE_VIEW', () => u && (u.permissions.some(e => e.name == 'assign_module_view' || arg == "/") || u.is_master));
		// inject('ASSIGN_MODULE_ACCESS', () => u && (u.permissions.some(e => e.name == 'assign_module_access' || arg == "/") || u.is_master));

		// inject('USER_CREATE', () => u && (u.permissions.some(e => e.name == 'user_create' || arg == "/") || u.is_master));
		// inject('USER_EDIT', () => u && (u.permissions.some(e => e.name == 'user_edit' || arg == "/") || u.is_master));
		// inject('USER_DELETE', () => u && (u.permissions.some(e => e.name == 'user_delete' || arg == "/") || u.is_master));
		// inject('USER_VIEW', () => u && (u.permissions.some(e => e.name == 'user_view' || arg == "/") || u.is_master));
		// inject('USER_ACCESS', () => u && (u.permissions.some(e => e.name == 'user_access' || arg == "/") || u.is_master));

		// inject('ROLE_CREATE', () => u && (u.permissions.some(e => e.name == 'role_create' || arg == "/") || u.is_master));
		// inject('ROLE_EDIT', () => u && (u.permissions.some(e => e.name == 'role_edit' || arg == "/") || u.is_master));
		// inject('ROLE_DELETE', () => u && (u.permissions.some(e => e.name == 'role_delete' || arg == "/") || u.is_master));
		// inject('ROLE_VIEW', () => u && (u.permissions.some(e => e.name == 'role_view' || arg == "/") || u.is_master));
		// inject('ROLE_ACCESS', () => u && (u.permissions.some(e => e.name == 'role_access' || arg == "/") || u.is_master));

		// inject('ASSIGN_PERMISSION_CREATE', () => u && (u.permissions.some(e => e.name == 'assign_permission_create' || arg == "/") || u.is_master));
		// inject('ASSIGN_PERMISSION_EDIT', () => u && (u.permissions.some(e => e.name == 'assign_permission_edit' || arg == "/") || u.is_master));
		// inject('ASSIGN_PERMISSION_DELETE', () => u && (u.permissions.some(e => e.name == 'assign_permission_delete' || arg == "/") || u.is_master));
		// inject('ASSIGN_PERMISSION_VIEW', () => u && (u.permissions.some(e => e.name == 'assign_permission_view' || arg == "/") || u.is_master));
		// inject('ASSIGN_PERMISSION_ACCESS', () => u && (u.permissions.some(e => e.name == 'assign_permission_access' || arg == "/") || u.is_master));
	}
  }