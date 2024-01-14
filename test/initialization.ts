// utils libs env and mocks initialization

import { setupTest } from '../src/test/setup-e2e';

jest.setTimeout(300000); // 5 minutes
setupTest();
