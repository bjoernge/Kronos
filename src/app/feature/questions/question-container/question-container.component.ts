import {Component, EventEmitter, Input, Output, TrackByFunction} from "@angular/core";
import {QuestionContainer, QuestionContainerEntry} from "../../../models/questions/questionContainer";
import {FormGroup} from "@angular/forms";
import {QuestionService} from "../question.service";
import {Question} from "../../../models/questions/question";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {SafeSubscriptionComponent} from "../../../shared/safe-subscription-component";

@Component({
    selector: "app-question-container",
    templateUrl: "./question-container.component.html",
    styleUrls: ["./question-container.component.scss"],
})
export class QuestionContainerComponent extends SafeSubscriptionComponent {

    @Input()
    public questionContainer: QuestionContainer;

    @Input()
    public allowNext = false;
    @Input()
    public allowPrevious = false;

    @Input()
    public context: any;

    @Input()
    public group: FormGroup;

    public questions$: Observable<Question[]>;
    @Output()
    public goBack = new EventEmitter();
    @Output()
    public continue = new EventEmitter();

    constructor(private questionService: QuestionService) {
        super();
    }

    public trackByQuestionEntryId: TrackByFunction<QuestionContainerEntry> = (index, entry) => entry && entry.question.id;

    ngOnInit() {
        this.questions$ = this.group.valueChanges.pipe(
            startWith({}),
            map(context => this.questionContainer.questionEntries
                .filter(q => !q.isHidden || !q.isHidden(context))
                .map(q => q.question))
        );
    }

}
