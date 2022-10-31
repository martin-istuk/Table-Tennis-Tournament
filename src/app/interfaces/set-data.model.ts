import { ISetData } from "./set-data.interface";

export class SetData {
	public setIndex: number;
	public scoreHome: number;
	public scoreAway: number;
	public error: boolean;

	constructor(setData: ISetData) {
		this.setIndex = setData.setIndex;
		this.scoreHome = setData.scoreHome;
		this.scoreAway = setData.scoreAway;
		this.error = setData.error;
	}
}
