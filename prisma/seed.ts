// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
	const category = await prisma.category.create({
		data: {
			name: 'Шинопровод 60А, 4 полюса',
			slug: 'busbar-60a-4p',
			products: {
				create: {
					name: 'Базовый комплект 60А',
					slug: 'base-60a-kit',
					description: 'Базовый комплект троллейного шинопровода для промышленных нужд.',
					imageUrl: '/images/busbar-60a.jpg',
					specs: {
						poles: 4,
						amperage: 60,
						length: '10 м',
					},
					drawingUrl: '/drawings/60a.dxf',
				},
			},
		},
		include: { products: true },
	});

	console.log('Категория и продукт созданы:', category);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
