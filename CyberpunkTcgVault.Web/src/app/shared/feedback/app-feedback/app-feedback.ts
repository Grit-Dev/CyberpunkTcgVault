import { Component } from '@angular/core';

import { FeedbackService } from '../../../core/feedback/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  templateUrl: './app-feedback.html',
  styleUrl: './app-feedback.scss'
})
export class AppFeedback {
  constructor(readonly feedbackService: FeedbackService) { }
}
