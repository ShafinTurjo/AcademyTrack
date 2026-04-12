<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\AnalyzeStudentRiskJob;

class RunRiskAnalysis extends Command
{
    protected $signature = 'risk:analyze';
    protected $description = 'Run academic risk analysis for all students';

    public function handle()
    {
        AnalyzeStudentRiskJob::dispatch();

        $this->info('Risk analysis job dispatched successfully.');

        return Command::SUCCESS;
    }
}