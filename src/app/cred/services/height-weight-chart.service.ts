import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class HeightWeightChartService {

    constructor(private http: HttpClient) {
    }

    getDataWeightBoy() {
        return this.http
            .get<any>('assets/data/boy_weight.json')
    }


    getDataWeightGirl() {
        return this.http
            .get<any>('assets/data/girl_weight.json')
    }

    getDataHeightBoy() {
        return this.http
            .get<any>('assets/data/boy_height.json')
    }

    getDataHeightGirl() {
        return this.http
            .get<any>('assets/data/girl_height.json')
    }

    getDataHeightWeightGirl() {
        return this.http
            .get<any>('assets/data/girl_height_weight.json')
    }

    getDataHeightWeightBoy() {
        return this.http
            .get<any>('assets/data/boy_height_weight.json')
    }

    getDataCircumferenceBoy() {
        return this.http
            .get<any>('assets/data/circumference_boys.json')
    }

    getDataCircumferenceGirl() {
        return this.http
            .get<any>('assets/data/circumference_girls.json')
    }
}
