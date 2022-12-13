import { Body, Controller, Post } from '@nestjs/common';
import { DetermineNextStateDto } from './dto/determine-next-state.dto';

@Controller('graph-data')
export class GraphDataController {
    private readonly nodeRules = [
        {status: 1, transition: ['S','A','S'], nextStatus: 2},
        {status: 2, transition: ['S','P','S'], nextStatus: 3},
        {status: 3, transition: ['R','U','S'], nextStatus: 4},
        {status: 4, transition: ['R','P','S'], nextStatus: 2},
        {status: 4, transition: ['R','A','S'], nextStatus: 5},
        {status: 4, transition: ['R','P','B'], nextStatus: 5},
        {status: 5, transition: ['R','P','S'], nextStatus: 2},
        {status: 5, transition: ['R','A','S'], nextStatus: 1}
    ];
    @Post()
    getNextState(@Body() determineNextStateDto: DetermineNextStateDto): String[]{
        let returnData = [];
        const transition = determineNextStateDto.transition;
        const statuses = determineNextStateDto.statuses;
        this.nodeRules.forEach(rule => { //Comparison on each node
            let currentState = rule.status
            let a = rule.transition;
            let b = transition;
            const isEqual = (a, b) => a.join() == b.join(); // Compare transition passed and that in the rules
                    
            if(isEqual(a,b)){ //check in rules if we have one with the provided transition
                returnData.push(`If Current state is ${rule.status} then nextState is ${rule.nextStatus}`);
            }

            if(statuses.length != 0){
                statuses.forEach(item => {
                    let passedState = item
                    if(passedState === currentState && isEqual(a,b)){
                        returnData.push(`If state is ${item} then nextState is ${rule.nextStatus}`);
                    }

                })
            }
        })

        return returnData;
    }
}
