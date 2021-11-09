import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class WeightAgeService {

    constructor(private http: HttpClient) {
    }

    getDataGraph() {
        return this.http
            .get<any>('assets/data/graph_child_age.json')
        // .toPromise()
        // .then((res) => {
        //     // console.log(res)
        //     return res.data
        // })
    }
}
