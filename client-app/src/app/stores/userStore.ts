﻿import { error } from "console";
import { th } from "date-fns/esm/locale";
import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
	user: User | null = null;

	constructor() {
		makeAutoObservable(this);
	} 

	get isLoggedIn() {
		return !!this.user;
	}

	login = async (creds: UserFormValues) => {
		try {
			
			const user = await agent.Accounts.login(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => this.user = user);
			history.push('/activities');
			store.modalStore.closeModal();
			
		}
		catch (error) {
		
		  throw error;
		}

	}

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		history.push('/');
	}

	getUser = async () => {
		try {
			const user = await agent.Accounts.current();
			runInAction(() => this.user = user);
		}
		catch (error) {

        }
	}

	register = async (creds: UserFormValues) => {

		try {

			const user = await agent.Accounts.register(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => this.user = user);
			history.push('/activities');
			store.modalStore.closeModal();

		}
		catch (error) {

			throw error;
		}
    }
}