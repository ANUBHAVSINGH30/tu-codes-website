import { NextResponse } from 'next/server';
import { fetchProjects, fetchProjectsCount } from '../../../../lib/queries';

export async function GET() {
    try {
        const [projects, count] = await Promise.all([
            fetchProjects(),
            fetchProjectsCount(),
        ]);

        return NextResponse.json({
            projects,
            count,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
