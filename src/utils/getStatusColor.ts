export const getStatusColor = (statusCode: number) => {

    switch (statusCode) {
        case 32:
        case 34:
            return 'bg-red-300';
        case 30:
        case 31:
            return 'bg-blue-300';
        case 36:
        case 37:
            return 'bg-green-300';
        case 33:
        case 35:
            return 'bg-orange-300';
        default:
            return 'bg-gray-300';
    }

}