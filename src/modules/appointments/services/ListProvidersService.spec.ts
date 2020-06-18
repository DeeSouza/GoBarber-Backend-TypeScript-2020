import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProviders = new ListProvidersService(
			fakeUsersRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to show the providers', async () => {
		const userOne = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const userTwo = await fakeUsersRepository.create({
			name: 'Jane Doe',
			email: 'janedoe@example.com',
			password: '123456',
		});

		const loggedUser = await fakeUsersRepository.create({
			name: 'Diego Souza',
			email: 'diego@example.com',
			password: '123456',
		});

		const providers = await listProviders.execute({
			user_id: loggedUser.id,
		});

		expect(providers).toEqual([userOne, userTwo]);
	});
});
