import { calculateFinalPrice } from './priceCalculator';

// Autor: Albert Martinez
// Ejercicios 2: Técnicas de Pruebas – función calculateFinalPrice

describe('Intuition and Experience Based Tests', () => {
  test('Descuento típico: 200 con 10% => 180', () => {
    expect(calculateFinalPrice(200, 10)).toBe(180);
  });

  test('Sin descuento: el precio no cambia (100 con 0% => 100)', () => {
    expect(calculateFinalPrice(100, 0)).toBe(100);
  });

  test('Descuento total: 100 con 100% => 0 (producto gratis)', () => {
    expect(calculateFinalPrice(100, 100)).toBe(0);
  });

  test('Precio con decimales: 19.99 con 15% => 16.9915', () => {
    expect(calculateFinalPrice(19.99, 15)).toBeCloseTo(16.9915, 4);
  });

  test('Descuento con decimales: 80 con 12.5% => 70', () => {
    expect(calculateFinalPrice(80, 12.5)).toBeCloseTo(70, 10);
  });

  test('Precio cero: 0 con 50% => 0', () => {
    expect(calculateFinalPrice(0, 50)).toBe(0);
  });

  test('Precio muy grande: 1e9 con 50% => 5e8', () => {
    expect(calculateFinalPrice(1e9, 50)).toBe(5e8);
  });

  test('Entrada inválida: NaN no produce un precio válido', () => {
    // NaN no es < 0 ni > 100, por lo que la función no lanza error y devuelve NaN
    expect(calculateFinalPrice(NaN, 10)).toBeNaN();
  });
});

describe('Domain Based Tests', () => {
  describe('Clases de equivalencia', () => {
    test('Precio positivo y descuento válido (0-100)', () => {
      expect(calculateFinalPrice(50, 20)).toBe(40);
    });

    test('Precio negativo (clase inválida) lanza error', () => {
      expect(() => calculateFinalPrice(-50, 20)).toThrow('Invalid input');
    });

    test('Descuento negativo (clase inválida) lanza error', () => {
      expect(() => calculateFinalPrice(50, -20)).toThrow('Invalid input');
    });

    test('Descuento mayor a 100 (clase inválida) lanza error', () => {
      expect(() => calculateFinalPrice(50, 150)).toThrow('Invalid input');
    });
  });

  describe('Valores límite', () => {
    test('Precio en el límite inferior válido: 0', () => {
      expect(calculateFinalPrice(0, 10)).toBe(0);
    });

    test('Precio justo debajo del límite: -0.01 lanza error', () => {
      expect(() => calculateFinalPrice(-0.01, 10)).toThrow('Invalid input');
    });

    test('Precio justo encima del límite: 0.01 es válido', () => {
      expect(calculateFinalPrice(0.01, 0)).toBeCloseTo(0.01, 10);
    });

    test('Descuento en el límite inferior: 0 es válido', () => {
      expect(calculateFinalPrice(100, 0)).toBe(100);
    });

    test('Descuento justo debajo del límite inferior: -1 lanza error', () => {
      expect(() => calculateFinalPrice(100, -1)).toThrow('Invalid input');
    });

    test('Descuento justo encima del límite inferior: 1 es válido', () => {
      expect(calculateFinalPrice(100, 1)).toBe(99);
    });

    test('Descuento justo debajo del límite superior: 99 es válido', () => {
      expect(calculateFinalPrice(100, 99)).toBeCloseTo(1, 10);
    });

    test('Descuento en el límite superior: 100 es válido', () => {
      expect(calculateFinalPrice(100, 100)).toBe(0);
    });

    test('Descuento justo encima del límite superior: 101 lanza error', () => {
      expect(() => calculateFinalPrice(100, 101)).toThrow('Invalid input');
    });
  });
});

describe('Code Based Tests', () => {
  describe('Cobertura de sentencias y ramas', () => {
    test('Rama verdadera del if: se ejecuta el throw', () => {
      expect(() => calculateFinalPrice(-1, 50)).toThrow(Error);
    });

    test('Rama falsa del if: se ejecuta el return', () => {
      expect(calculateFinalPrice(100, 25)).toBe(75);
    });
  });

  describe('Cobertura de condiciones', () => {
    // Condición 1: originalPrice < 0
    test('C1 verdadera (precio < 0)', () => {
      expect(() => calculateFinalPrice(-10, 50)).toThrow('Invalid input');
    });
    test('C1 falsa (precio >= 0)', () => {
      expect(calculateFinalPrice(10, 50)).toBe(5);
    });

    // Condición 2: discountPercentage < 0
    test('C2 verdadera (descuento < 0, precio válido)', () => {
      expect(() => calculateFinalPrice(10, -5)).toThrow('Invalid input');
    });
    test('C2 falsa (descuento >= 0)', () => {
      expect(calculateFinalPrice(10, 5)).toBeCloseTo(9.5, 10);
    });

    // Condición 3: discountPercentage > 100
    test('C3 verdadera (descuento > 100, precio y descuento >= 0)', () => {
      expect(() => calculateFinalPrice(10, 200)).toThrow('Invalid input');
    });
    test('C3 falsa (descuento <= 100)', () => {
      expect(calculateFinalPrice(10, 100)).toBe(0);
    });
  });
});
