import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'coursesArray'
})
export class coursesArrayPipe implements PipeTransform{
    transform(object: any = []): any{
        return Object.values(object);
    }
}