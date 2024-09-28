import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Getting session cart items should return the parsed JSON from sessionStorage.
  it('should return the parsed JSON from sessionStorage when getting session cart items', function () {

    let http = TestBed.inject(HttpClient)
    // Arrange
    const cartService = new CartService(http);
    const sessionCartItems = { item1: 'item1', item2: 'item2' };
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(sessionCartItems));

    // Act
    const result = cartService.getSessionCartItems;

    // Assert
    expect(result).toEqual(sessionCartItems);
  });
});
